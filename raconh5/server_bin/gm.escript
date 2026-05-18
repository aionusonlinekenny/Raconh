#!/usr/bin/env escript
%%! -name gm_php@127.0.0.1 -setcookie stupidcat

%% Usage:
%%   escript gm.escript get  <role_id>
%%   escript gm.escript find <account_name>
%%   escript gm.escript set  <role_id> lev|exp|gold|gold_bind|coin <value>
%%   escript gm.escript online

-define(NODE, 'newserver@127.0.0.1').

field_pos("lev")       -> 12;
field_pos("exp")       -> 23;
field_pos("gold")      -> 24;
field_pos("gold_bind") -> 25;
field_pos("coin")      -> 28;
field_pos(_)           -> 0.

connect() ->
    case net_adm:ping(?NODE) of
        pong -> ok;
        pang -> io:format("error|cannot_connect_to_game_server~n"), halt(1)
    end.

main(["get", RoleIdStr]) ->
    connect(),
    RoleId = list_to_integer(RoleIdStr),
    case rpc:call(?NODE, mnesia, dirty_read, [role_data, RoleId]) of
        [RD] ->
            RB = element(4, RD),
            Online = case rpc:call(?NODE, ets, lookup, [role_online, RoleId]) of
                [] -> 0; _ -> 1
            end,
            %% ok|lev|exp|gold|gold_bind|coin|is_online
            io:format("ok|~B|~B|~B|~B|~B|~B~n", [
                element(12, RB),
                element(23, RB),
                element(24, RB),
                element(25, RB),
                element(28, RB),
                Online
            ]);
        _ ->
            io:format("error|not_found~n")
    end;

main(["find", AccountStr]) ->
    connect(),
    Account = list_to_binary(AccountStr),
    Res = rpc:call(?NODE, mnesia, dirty_foldl, [
        fun(RB, Acc) ->
            case element(5, RB) =:= Account of
                true  -> [RB | Acc];
                false -> Acc
            end
        end,
        [],
        role_base
    ]),
    case Res of
        [RB|_] when is_tuple(RB) ->
            Id   = element(2, RB),
            Name = element(6, RB),
            Lev  = element(12, RB),
            io:format("ok|~B|~ts|~B~n", [Id, Name, Lev]);
        [] ->
            io:format("error|not_found~n");
        _ ->
            io:format("error|rpc_failed~n")
    end;

main(["online"]) ->
    connect(),
    Rows = rpc:call(?NODE, ets, tab2list, [role_online]),
    case Rows of
        List when is_list(List) ->
            lists:foreach(fun(R) ->
                Id     = element(2, R),
                Name   = element(6, R),
                Lev    = element(9, R),
                io:format("~B|~ts|~B~n", [Id, Name, Lev])
            end, List);
        _ -> io:format("error|rpc_failed~n")
    end;

main(["set", RoleIdStr, Field, ValueStr]) ->
    connect(),
    RoleId = list_to_integer(RoleIdStr),
    Value  = list_to_integer(ValueStr),
    Pos    = field_pos(Field),
    if Pos =:= 0 ->
        io:format("error|unknown_field~n");
    true ->
        Res = rpc:call(?NODE, erlang, apply, [fun() ->
            case ets:lookup(role_online, RoleId) of
                [_|_] ->
                    {error, player_must_be_offline};
                [] ->
                    case mnesia:dirty_read(role_data, RoleId) of
                        [RD] ->
                            RB    = element(4, RD),
                            NewRB = setelement(Pos, RB, Value),
                            NewRD = setelement(4, RD, NewRB),
                            mnesia:dirty_write(NewRD),
                            mnesia:dirty_write(NewRB),
                            ok;
                        [] ->
                            {error, not_found}
                    end
            end
        end, []]),
        case Res of
            ok              -> io:format("ok~n");
            {error, Reason} -> io:format("error|~p~n", [Reason]);
            _               -> io:format("error|rpc_failed~n")
        end
    end;

main(["fields", RoleIdStr]) ->
    %% Dump all field values of role_base with positions — helps find VIP etc.
    connect(),
    RoleId = list_to_integer(RoleIdStr),
    case rpc:call(?NODE, mnesia, dirty_read, [role_data, RoleId]) of
        [RD] ->
            RB = element(4, RD),
            Size = tuple_size(RB),
            lists:foreach(fun(I) ->
                Val = element(I, RB),
                io:format("~B|~p~n", [I, Val])
            end, lists:seq(1, Size));
        _ ->
            io:format("error|not_found~n")
    end;

main(_) ->
    io:format("error|invalid_args~n").

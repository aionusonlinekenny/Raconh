#!/usr/bin/env escript
%%! -name gm_php@127.0.0.1 -setcookie stupidcat

%% Usage:
%%   escript gm.escript get    <role_id>
%%   escript gm.escript find   <account_name>
%%   escript gm.escript set    <role_id> lev|exp|gold|gold_bind|coin|vip_lev <value>
%%   escript gm.escript rename <role_id> <base64_encoded_name>
%%   escript gm.escript online

-define(NODE, 'newserver@127.0.0.1').

%% Minimum vip_exp required for each VIP level (from vip_data:get_vip/1 probing).
vip_exp_for_lev(0)  -> 0;
vip_exp_for_lev(1)  -> 100;
vip_exp_for_lev(2)  -> 500;
vip_exp_for_lev(3)  -> 1000;
vip_exp_for_lev(4)  -> 2000;
vip_exp_for_lev(5)  -> 5000;
vip_exp_for_lev(6)  -> 10000;
vip_exp_for_lev(7)  -> 20000;
vip_exp_for_lev(8)  -> 50000;
vip_exp_for_lev(9)  -> 100000;
vip_exp_for_lev(10) -> 200000;
vip_exp_for_lev(11) -> 250000;
vip_exp_for_lev(12) -> 500000;
vip_exp_for_lev(_)  -> 500000.
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
            RE = element(5, RD),
            %% Server recalculates VIP level from vip_exp on login; use get_vip/1 for accuracy
            VipExp = element(4, element(38, RE)),
            VipLev = rpc:call(?NODE, vip_data, get_vip, [VipExp]),
            Online = case rpc:call(?NODE, ets, lookup, [role_online, RoleId]) of
                [] -> 0; _ -> 1
            end,
            Name = element(6, RB),
            %% ok|lev|exp|gold|gold_bind|coin|vip_lev|is_online|name
            io:format("ok|~B|~B|~B|~B|~B|~B|~B|~ts~n", [
                element(12, RB),
                element(23, RB),
                element(24, RB),
                element(25, RB),
                element(28, RB),
                VipLev,
                Online,
                Name
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

%% rename: name is passed as base64 to safely handle Unicode/Chinese chars
main(["rename", RoleIdStr, B64Name]) ->
    connect(),
    RoleId = list_to_integer(RoleIdStr),
    NewNameBin = base64:decode(B64Name),
    case rpc:call(?NODE, ets, lookup, [role_online, RoleId]) of
        [_|_] ->
            io:format("error|player_must_be_offline~n");
        [] ->
            case rpc:call(?NODE, mnesia, dirty_read, [role_data, RoleId]) of
                [RD] ->
                    RB    = element(4, RD),
                    NewRB = setelement(6, RB, NewNameBin),
                    NewRD = setelement(4, RD, NewRB),
                    rpc:call(?NODE, mnesia, dirty_write, [NewRD]),
                    rpc:call(?NODE, mnesia, dirty_write, [NewRB]),
                    io:format("ok~n");
                [] ->
                    io:format("error|not_found~n");
                _ ->
                    io:format("error|rpc_failed_read~n")
            end;
        _ ->
            io:format("error|rpc_failed_ets~n")
    end;

%% vip_lev is nested: role_data -> element(5)=role_ext -> element(38)=role_vip -> element(3)=level
%% Also set vip_exp (element 4) large enough that the server won't recalculate lev back to 0.
main(["set", RoleIdStr, "vip_lev", ValueStr]) ->
    connect(),
    RoleId = list_to_integer(RoleIdStr),
    Value  = list_to_integer(ValueStr),
    VipExp = vip_exp_for_lev(Value),
    case rpc:call(?NODE, ets, lookup, [role_online, RoleId]) of
        [_|_] ->
            io:format("error|player_must_be_offline~n");
        [] ->
            case rpc:call(?NODE, mnesia, dirty_read, [role_data, RoleId]) of
                [RD] ->
                    RE    = element(5, RD),
                    RV0   = element(38, RE),
                    RV1   = setelement(3, RV0, Value),
                    RV2   = setelement(4, RV1, VipExp),
                    NewRE = setelement(38, RE, RV2),
                    NewRD = setelement(5, RD, NewRE),
                    rpc:call(?NODE, mnesia, dirty_write, [NewRD]),
                    io:format("ok~n");
                [] ->
                    io:format("error|not_found~n");
                _ ->
                    io:format("error|rpc_failed_read~n")
            end;
        _ ->
            io:format("error|rpc_failed_ets~n")
    end;

main(["set", RoleIdStr, Field, ValueStr]) ->
    connect(),
    RoleId = list_to_integer(RoleIdStr),
    Value  = list_to_integer(ValueStr),
    Pos    = field_pos(Field),
    if Pos =:= 0 ->
        io:format("error|unknown_field~n");
    true ->
        case rpc:call(?NODE, ets, lookup, [role_online, RoleId]) of
            [_|_] ->
                io:format("error|player_must_be_offline~n");
            [] ->
                case rpc:call(?NODE, mnesia, dirty_read, [role_data, RoleId]) of
                    [RD] ->
                        RB    = element(4, RD),
                        NewRB = setelement(Pos, RB, Value),
                        NewRD = setelement(4, RD, NewRB),
                        rpc:call(?NODE, mnesia, dirty_write, [NewRD]),
                        rpc:call(?NODE, mnesia, dirty_write, [NewRB]),
                        io:format("ok~n");
                    [] ->
                        io:format("error|not_found~n");
                    _ ->
                        io:format("error|rpc_failed_read~n")
                end;
            _ ->
                io:format("error|rpc_failed_ets~n")
        end
    end;

main(["fields", RoleIdStr]) ->
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

%% clear_filter: clears both the ETS runtime cache (filter_data) and the
%% Mnesia source table (sys_sensitive_word).
main(["clear_filter"]) ->
    connect(),
    EtsRes = rpc:call(?NODE, ets, delete_all_objects, [filter_data]),
    MnsRes = rpc:call(?NODE, mnesia, clear_table, [sys_sensitive_word]),
    io:format("ok|ets:~p|mnesia:~p~n", [EtsRes, MnsRes]);

%% patch_filter: hot-replaces the broken filter module with a no-op version.
%% filter.erl calls re:replace with Unicode codepoint lists (>255) which
%% causes badarg on OTP 21. This replacement simply passes text through.
%% Exports discovered from filter.beam: filter/1, is_violation/1,
%% is_violation_words/2, strict/2, moderate/2, loosen/2.
main(["patch_filter"]) ->
    connect(),
    Src =
        "-module(filter).\n"
        "-export([filter/1,is_violation/1,is_violation_words/2,"
                 "strict/2,moderate/2,loosen/2]).\n"
        "filter(T) -> T.\n"
        "is_violation(_) -> false.\n"
        "is_violation_words(_,_) -> false.\n"
        "strict(_,T) -> T.\n"
        "moderate(_,T) -> T.\n"
        "loosen(_,T) -> T.\n",
    TmpFile = "filter_patch.erl",
    rpc:call(?NODE, file, write_file, [TmpFile, list_to_binary(Src)]),
    case rpc:call(?NODE, compile, file, [TmpFile, [binary, return_errors]]) of
        {ok, filter, Bin} ->
            rpc:call(?NODE, file, delete, [TmpFile]),
            case rpc:call(?NODE, code, load_binary, [filter, "filter.erl", Bin]) of
                {module, filter} -> io:format("ok~n");
                E -> io:format("error|load:~p~n", [E])
            end;
        {error, Errors, _} ->
            io:format("error|compile:~p~n", [Errors]);
        E ->
            io:format("error|~p~n", [E])
    end;

main(_) ->
    io:format("error|invalid_args~n").

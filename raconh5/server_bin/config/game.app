%% 应用程序信息文件
{application, game, [
    {description, "game server"}
    , {vsn, "0.1"}
    , {modules, [game]}
    , {registered, []}
    , {applications, [kernel, stdlib, sasl]}
    , {mod, {game, []}}
    , {start_phases, []}
    , {env, [
        {server_id, 10001}              %% 当前服务器id,带有agent_id
        , {server_ids, []}              %% 本服合服id列表
        , {agent, "kudai"}              %% 当前平台名称
        , {version, "v20180401"}        %% 当前版本
        , {open_time, "2018-04-01"}     %% 开服时间 2018-04-01
        , {is_check, false}             %% 登录是否验证签名
        , {server_key, "7fd695de5c1992e74b26b91efbf0a486"}  %% 服务器登录密钥 默认util_encry:md5("cwgame_" ++ util_type:v2l(util_encry:md5("server_key"))).
        , {api_key, "4b1591bd0be715f710d6420923154155"} %% 节点间或与后台的接口密钥, 默认util_encry:md5("cwgame_" ++ util_type:v2l(util_encry:md5("api_key"))).
        , {fcm_version, 0}              %% 防沉迷版本[0:关闭 1:严格版本 2:普通版本]
        , {is_allow_guest, false}        %% 是否开启游客模式
        , {is_gm_cmd, true}             %% 是否开启GM命令，默认关
        , {admin_api, "http://127.0.0.1:8210/api/"}    %% 后台接口路径
        , {center_api, "http://127.0.0.1:8220/api/"}   %% 中央后台接口路径

        , {app_id, "1000047"}           %% APPID
        , {server_host, "134.22.38.31"}    %% 服务器外网IP
        , {server_port, 9001}           %% 节点端口
        , {server_ssl_port, 10001}      %% 节点SSL端口 https

        %% 数据库相关设置
        , {db_mnesia, [{mod, db_mnesia_srv}]}   %% game服：db_mnesia_srv，跨服：db_mnesia_cross，CDB服：db_mnesia_cdb
        , {db_dets, [{mod, db_dets_srv}]}       %% game服：db_dets_srv，跨服：db_dets_cross，CDB服：db_dets_cdb
        , {db_mysql, [
            {mod, db_mysql_srv}                 %% game服：db_mysql_srv，跨服：db_mysql_cross，CDB服：db_mysql_cdb
            , {host, "localhost"}       %% mysql ip
            , {port, 3306}              %% mysql 端口
            , {user, "root"}            %% mysql 账号
            , {password, ""}      %% mysql 密码
            , {db, "cw02_game1"}        %% mysql 数据库名
            , {encode, utf8}            %% mysql 编码
            , {pool_size, 8}            %% mysql 进程池大小
        ]}
    ]}
]}.


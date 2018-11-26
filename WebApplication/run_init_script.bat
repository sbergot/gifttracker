SET PGCLIENTENCODING=utf-8
chcp 65001
dotnet ef database drop -f
dotnet ef database update
psql -U application -d gifttracker -f .\SqlScripts\init.sql
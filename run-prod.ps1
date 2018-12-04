Start-Process yarn watch:prod;
Start-Process dotnet @('watch', 'run') -WorkingDirectory './WebApplication';
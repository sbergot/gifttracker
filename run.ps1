$env:ASPNETCORE_ENVIRONMENT='Development';
Start-Process yarn watch;
Start-Process dotnet @('watch', 'run') -WorkingDirectory './WebApplication';
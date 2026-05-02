using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicy = "ReactClient";

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .SetIsOriginAllowed(_ => true)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddSignalR(options =>
{
    options.MaximumReceiveMessageSize = 10 * 1024 * 1024;
});

var app = builder.Build();

app.UseCors(CorsPolicy);

app.MapGet("/", () => Results.Ok("Phone Sync API is running."));
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.MapHub<PhoneSyncHub>("/hubs/phone-sync");

app.Run("http://0.0.0.0:5055");

public sealed class PhoneSyncHub : Hub
{
    public async Task JoinSession(string sessionId, string deviceType)
    {
        if (string.IsNullOrWhiteSpace(sessionId))
            throw new HubException("Session id is required.");

        await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);

        await Clients.Group(sessionId).SendAsync("DeviceJoined", new
        {
            sessionId,
            deviceType,
            connectionId = Context.ConnectionId,
            joinedAtUtc = DateTime.UtcNow
        });
    }

    public async Task SendImageToDesktop(ImageUploadRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.SessionId))
            throw new HubException("Session id is required.");

        if (string.IsNullOrWhiteSpace(request.DataUrl))
            throw new HubException("Image data is required.");

        await Clients.Group(request.SessionId).SendAsync("ImageReceived", new
        {
            request.SessionId,
            request.FileName,
            request.ContentType,
            request.DataUrl,
            uploadedAtUtc = DateTime.UtcNow
        });
    }
}

public sealed record ImageUploadRequest(
    string SessionId,
    string FileName,
    string ContentType,
    string DataUrl);
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ApiSimples.Hubs
{
    public class StreamingHub: Hub
    {
      public async Task JoinRoom(string roomName)
      {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Group(roomName).SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined the group {roomName}.");
    }

      public Task LeaveRoom(string roomName)
      {
        return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
      }
  }
}
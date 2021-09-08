using System.Collections.Generic;
using ApiSimples.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Concurrent;
using System.IO;
using System.Threading;
using ApiSimples.Results;
using System.Threading.Tasks;
using System.Text.Json;
using ApiSimples.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace ApiSimples.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private static ConcurrentBag<StreamWriter> _clients = new ConcurrentBag<StreamWriter>();
        private static List<Item> _itens = new List<Item>();
        private readonly IHubContext<StreamingHub> _streaming;

        public TodoController(IHubContext<StreamingHub> streaming) => _streaming = streaming;

        [HttpGet]
        public ActionResult<List<Item>> Get() => _itens;

        [HttpPost]
        public async Task<ActionResult<Item>> Post([FromBody] Item value, [FromHeader]string nameGroup)
        {
            if(value == null)
                return BadRequest();

            if (value.Id == 0)
            {
              if (value.Id == 0)
              {
                if (_itens.Count == 0)
                {
                  value.Id = 1;
                }
                else
                {
                  var max = _itens.Max(i => i.Id);
                  value.Id = max + 1;
                }
              }
            }
            _itens.Add(value);

            await WriteOnStream(value, "Item added", nameGroup);

            return value;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Item>> Put(long id, [FromBody] Item value, [FromHeader] string nameGroup)
        {
            var item = _itens.SingleOrDefault(i => i.Id == id);
            if(item != null)
            {
                _itens.Remove(item);
                value.Id = id;
                _itens.Add(value);

                await WriteOnStream(value, "Item updated", nameGroup);

                return item;
            }
            
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(long id, [FromHeader] string nameGroup)
        {
            var item = _itens.SingleOrDefault(i => i.Id == id);
            if(item != null)
            {
                _itens.Remove(item);

                await WriteOnStream(item, "Item removed", nameGroup);
                
                return Ok(new { Description = "Item removed" });
            }

            return BadRequest();
        }

        private async Task WriteOnStream(Item data, string action, string groupName)
        {
            string jsonData = string.Format("{0}\n", JsonSerializer.Serialize(new { data, action }));
            
            //Utiliza o Hub para enviar uma mensagem para ReceiveMessage
            await _streaming.Clients.Group(groupName).SendAsync("ReceiveMessage", jsonData);
            //await _streaming.Clients.Group("WS2").SendAsync("ReceiveMessage", jsonData);

            foreach (var client in _clients)
            {
                await client.WriteAsync(jsonData);
                await client.FlushAsync();
            }
        }

        [HttpGet]
        [Route("streaming")]
        public IActionResult Streaming()
        {
            return new StreamResult(
                (stream, cancelToken) => {
                    var wait = cancelToken.WaitHandle;
                    var client = new StreamWriter(stream);
                    _clients.Add(client);

                    wait.WaitOne();

                    StreamWriter ignore;
                    _clients.TryTake(out ignore);
                }, 
                HttpContext.RequestAborted);
        }
    
  }
}
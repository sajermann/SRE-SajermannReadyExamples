using FluentEmail.Core;
using HandlebarsDotNet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace FluentEmailWithHandlebars
{
  public class EmailService
  {
    public async Task Send()
    {
      try
      {
        var order = new Order();
        order.ID = new Random().Next(1,5000);
        
        var cliente = new Client();
        cliente.Name = "Bruno";

        order.Cliente = cliente;

        var listItens = new List<Item>();
        
        var item = new Item();
        item.Id = 515;
        item.Description = "Caneta";
        listItens.Add(item);
        var item2 = new Item();
        item2.Id = 1312;
        item2.Description = "Borracha";
        listItens.Add(item2);

        order.Itens = listItens;

        string emailMounted = BuildHtml("Mytemplate.html", order);

        var email = Email
            .From("Email do Remetente", "Alemão")
            .To("Email do Destinatário", "Bruno") // Aceita List
            .CC("Email do Destinatário em Cópia") // Aceita List
            .BCC("Email do Destinatário em Cópia Oculta") // Aceita List
            .Subject("Pedido Alterado")
            .UsingTemplate(emailMounted, order);

        await email.SendAsync();


      }
      catch(Exception e)
      {
        var ttttt = e.Message;
      }
    }

    private static string BuildHtml(string fileTemplate, object data)
    {
      string source = File.ReadAllText(fileTemplate);

      var template = Handlebars.Compile(source);

      return template(data);
    }
  }
}

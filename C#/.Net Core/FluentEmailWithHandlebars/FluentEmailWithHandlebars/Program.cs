using FluentEmail.Core;
using FluentEmail.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace FluentEmailWithHandlebars
{
  public class Program
  {


    public static void Main(string[] args)
    {
      CreateHostBuilder(args).Build().Run();
    }

    
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
            {

              #region GetAppSettings
              var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())  //location of the exe file
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

              IConfigurationRoot configuration = builder.Build();
              #endregion

              services.AddHostedService<Worker>();

              #region ConfigFluentEmail
              var sender = new SmtpSender(() => new SmtpClient(configuration.GetSection("EmailConfigs")["Host"])
              {
                UseDefaultCredentials = Convert.ToBoolean(configuration.GetSection("EmailConfigs")["UseDefaultCredentials"]),
                EnableSsl = Convert.ToBoolean(configuration.GetSection("EmailConfigs")["EnableSsl"]),
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Port = int.Parse(configuration.GetSection("EmailConfigs")["Port"]),
                Credentials = new NetworkCredential(configuration.GetSection("EmailConfigs")["Username"], configuration.GetSection("EmailConfigs")["Password"])
              });
              Email.DefaultSender = sender;
              #endregion

            });
  }
}

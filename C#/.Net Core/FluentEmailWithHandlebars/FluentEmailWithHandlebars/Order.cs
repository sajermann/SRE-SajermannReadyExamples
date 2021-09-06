using System.Collections.Generic;

namespace FluentEmailWithHandlebars
{
  public class Order
  {
    public int ID { get; set; }
    public Client Cliente { get; set; }
    public List<Item> Itens { get; set; }
  }
}

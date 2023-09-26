using System.ComponentModel.DataAnnotations.Schema;

namespace BookshelfVaultBFF.DbModels
{
    public class Item
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public string BookId { get; set; }

        public Book Book { get; set; }

        public int CartId { get; set; }

        public Cart Cart { get; set; }
    }
}

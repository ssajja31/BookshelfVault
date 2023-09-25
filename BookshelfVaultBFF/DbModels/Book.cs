using System.ComponentModel.DataAnnotations.Schema;

namespace BookshelfVaultBFF.DbModels
{
    public class Book
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Author { get; set; }

        public string Publisher { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public string Description { get; set; }

        public string Thumbnail { get; set; }

        public string Preview { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public Category Category { get; set; }
    }
}

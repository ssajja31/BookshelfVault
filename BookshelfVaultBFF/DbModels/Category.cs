using System.ComponentModel.DataAnnotations.Schema;

namespace BookshelfVaultBFF.DbModels
{
    public class Category
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CategoryId { get; set; }

        public string Name { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}

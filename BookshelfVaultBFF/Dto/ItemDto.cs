namespace BookshelfVaultBFF.Dto
{
    public class ItemDto
    {
        public string BookId { get; set; }

        public string Title { get; set; }

        public decimal Price { get; set; }

        public string Thumbanil { get; set; }

        public string Author { get; set; }

        public int Quantity { get; set; }
    }
}

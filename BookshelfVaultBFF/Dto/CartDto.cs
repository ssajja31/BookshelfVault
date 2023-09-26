namespace BookshelfVaultBFF.Dto
{
    public class CartDto
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }

        public List<ItemDto> Items { get; set; }
    }
}

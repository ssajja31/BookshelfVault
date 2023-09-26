using System.Net.Http.Headers;

namespace BookshelfVaultBFF.DbModels
{
    public class Cart
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }

        public List<Item> Items { get; set; } = new();

        public void AddItem(Book book, int quantity)
        {
            if (Items.All(item => item.BookId != book.Id))
            {
                Items.Add(new Item { Book = book, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.BookId == book.Id);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(string bookId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.BookId == bookId);
            if (item == null)
            {
                return; 
            }
            item.Quantity -= quantity;

            if (item.Quantity == 0)
            {
                Items.Remove(item);
            }
        }
    }
}

namespace WebApplication.Models
{
    public class Gift
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }

        public int ReceiverId { get; set; }

        public int PriceInCents { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}

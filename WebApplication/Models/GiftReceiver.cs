namespace WebApplication.Models
{
    public class GiftReceiver
    {
        public int Id { get; set; }

        public int ReceiverId { get; set; }

        public Individual Receiver { get; set; }

        public int GiftId { get; set; }

        public Gift Gift { get; set; }
    }
}

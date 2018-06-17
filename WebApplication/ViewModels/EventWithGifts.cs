namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class EventWithGifts
    {
        public int EventId { get; set; }
        public List<GiftWithReceivers> Gifts { get; set; }
    }
}
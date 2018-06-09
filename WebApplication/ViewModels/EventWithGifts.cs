namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class EventWithGifts
    {
        public Event Event { get; set; }
        public List<Gift> Gifts { get; set; }
    }
}
namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class EventWithGifts : Event
    {
        public List<Gift> Gifts { get; set; }
    }
}
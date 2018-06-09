namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class TimeLine
    {
        public List<EventWithGifts> Events { get; set; }
        public List<Individual> Individuals { get; set; }
    }
}
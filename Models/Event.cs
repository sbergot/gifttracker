namespace WebApplication.Models
{
    using System.Collections.Generic;

    public class Event
    {
        public int Id { get; set; }

        public int Year { get; set; }

        public EventType Type { get; set; }
    }
}

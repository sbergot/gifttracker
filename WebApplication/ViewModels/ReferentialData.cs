namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class ReferentialData
    {
        public List<Event> Events { get; set; }
        public List<Individual> Individuals { get; set; }
    }
}
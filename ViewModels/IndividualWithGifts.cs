namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class IndividualWithGifts : Individual
    {
        public List<Individual> Individuals { get; set; }
    }
}
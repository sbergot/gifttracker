namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class IndividualWithGifts : Individual
    {
        public List<Gift> Gifts { get; set; }
    }
}
﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Contracts;

namespace Tickets_selling_App.Models
{
    public class Ticket
    {
        public int ID { get; set; }
        public string Title { get; set; }    
        public string? Description{ get; set; }
        public string Seat { get; set; }
        public int Price { get; set; }
        public DateTime Activation_Date { get; set; }
        public DateTime Expiration_Date { get; set; }
    }
}

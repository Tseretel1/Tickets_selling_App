﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Tickets_selling_App.Interfaces;
using Tickets_selling_App.Models;

namespace Tickets_selling_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly Tkt_Dbcontext _context;
        private readonly Admin_Interface _admin;
        public AdminController(Tkt_Dbcontext context, Admin_Interface admin)
        {
            _context = context;
            _admin = admin;
        }

        [HttpPost("/Add New Tickets")]
        public IActionResult AddTicket(Ticket ticket)
        {
            try
            {
                _admin.AddTicket(ticket);
                return Ok("Ticket has been Added");
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong");
            }
        }
        [HttpGet("/ See Al Tickets")]
        public IActionResult GetAlltickets()
        {
            try
            {
                var Tickets = _admin.GetAll_Tickets();

                if (Tickets == null || !Tickets.Any())
                    return NotFound("Ticket not Found");
                return Ok(Tickets);
            }
            catch(Exception ex)
            {
                return BadRequest($"Something went wrong {ex.Message}");
            }
        }
        [HttpDelete]
        public IActionResult Delete_Ticket(int ID)
        {
            try
            {
                _admin.DeleteTicket(ID);
                return Ok("Ticket Successfully Deleted!");
            }
            catch
            {
                return BadRequest("Something went wrong!");
            }
        }
    }
}

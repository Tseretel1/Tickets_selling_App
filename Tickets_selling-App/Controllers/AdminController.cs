﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System.Runtime.CompilerServices;
using Tickets_selling_App.Dtos;
using Tickets_selling_App.Interfaces;
using Tickets_selling_App.Models;

namespace Tickets_selling_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly Admin_Interface _admin;
        public AdminController(Admin_Interface admin)
        {
            _admin = admin;
        }
        [HttpPost("/Add New Tickets")]
        public IActionResult AddTicket(TicketDto ticket)
        {
            try
            {
                string Response = _admin.AddTicket(ticket);
                return Ok($"{Response}");
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong");
            }
        }
        [HttpGet("/See All Tickets")]
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
        [HttpDelete("/Delete Tickets")]
        public IActionResult Delete_Ticket(int TicketId)
        {
            try
            {
                _admin.DeleteTicket(TicketId);
                return Ok("Ticket Successfully Deleted!");
            }
            catch
            {
                return BadRequest("Something went wrong!");
            }
        }
    }
}
using CoreWebAngularApplication.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoreWebAngularApplication.Controllers
{
    //[ApiController]
    //[AutoValidateAntiforgeryToken]
    public class AccountController : Controller
    {
        private readonly ApplicationContext _context;
        private IAntiforgery _antiForgery;
        public AccountController(ApplicationContext context, IAntiforgery antiforgery)
        {
            _context = context;
            _antiForgery = antiforgery;
        }

        [Route("/antiforgery")]
        [IgnoreAntiforgeryToken]
        public IActionResult GenerateAntiForgeryTokens()
        {
            var tokens = _antiForgery.GetAndStoreTokens(HttpContext);
            Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = false
            });
            return NoContent();
        }

        [HttpPost("/register")]
        public IActionResult Register([FromBody] LoginUser user)
        {
            try
            {
                if (user.Userlogin == null || user.Password == null)
                {
                    return BadRequest(new { message = "login and password are null" });
                }

                _context.Persons.Add(new Person { Login = user.Userlogin, Password = user.Password, Role = "admin" });
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, trace = ex.StackTrace });
            }
        }

        [HttpPost("/token")]
        public IActionResult Token([FromBody] LoginUser user)
        {
            try
            {
                if (user.Userlogin == null && user.Password == null)
                {
                    return Unauthorized(new { message = "login and password are null" });
                }

                var identity = GetIdentity(user.Userlogin, user.Password);
                if (identity == null)
                {
                    return Unauthorized(new { message = "Invalid username or password." });
                }

                var now = DateTime.UtcNow;
                // создаем JWT-токен
                var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        claims: identity.Claims,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                var response = new
                {
                    access_token = encodedJwt,
                    userlogin = identity.Name
                };

                return Json(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, trace = ex.StackTrace });
            }
        }

        private ClaimsIdentity GetIdentity(string loginname, string password)
        {
            try
            {
                Person person = _context.Persons.FirstOrDefault(x => x.Login == loginname && x.Password == password);
                if (person != null)
                {
                    var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                    ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);
                    return claimsIdentity;
                }

                // если пользователя не найдено
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationService.Models
{
    /// <summary>
    /// Class representing the section having JWT details in config file
    /// </summary>
    public class JWT
    {
        /// <summary>
        /// The secret key to be used in JWT token
        /// </summary>
        public string SecretKey { get; set; }

        /// <summary>
        /// The issuer to be used in JWT token
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// The audience to be used in JWT token
        /// </summary>
        public string Audience { get; set; }
    }
}

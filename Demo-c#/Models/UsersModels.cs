using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Demo_c_.Models
{
    public class UsersModels
    {
        [Key]
        public int personid { get; set; }


        public string firstname_lastname { get; set; }


        public string studentid { get; set; }


        public string phone { get; set; }


        public string major { get; set; }


        public string gender { get; set; }


        public string topic { get; set; }


        public string facebookurl { get; set; }


        public string role { get; set; }


        public string organizationcode { get; set; }

        
        public DateTime timestamp_column { get; set; } = DateTime.Now;
    }
}

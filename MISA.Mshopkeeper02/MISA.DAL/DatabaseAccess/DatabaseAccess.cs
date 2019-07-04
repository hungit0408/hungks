using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace MISA.DAL
{
    /// <summary>
    /// Lớp thực hiện kết nối đến database
    /// CreatedBy: NDCong(10/6/2019)
    /// </summary>
    public class DatabaseAccess : IDisposable
    {
        //private string _connectionString = @"Data Source=DESKTOP-92UDDJU\SQLEXPRESS;Initial Catalog=MISA.MShopKeeper02_Development;Integrated Security=True";
        private string _connectionString = @"Data Source=DATABASE\SQL2014;Initial Catalog=MISA.MShopKeeper02_Development;Integrated Security=True";
        //private string _connectionString = @"workstation id=MshopKeeper.mssql.somee.com;packet size = 4096; user id = nguyenngoclama14_SQLLogin_1; pwd=x3gkrq6see;data source = MshopKeeper.mssql.somee.com; persist security info=False;initial catalog = MshopKeeper";
        private SqlConnection _sqlConnection;
        private SqlCommand _sqlCommand;

        public SqlCommand SqlCommand
        {
            get { return _sqlCommand; }
        }

        /// <summary>
        /// Hàm khởi tạo kết nối đến DB
        /// CreatedBy: NDCong(10/6/2019)
        /// </summary>
        public DatabaseAccess()
        {
            // thực hiện kiểm tra xem đã tồn tại Connection chưa, nếu chưa thì thực hiện khởi tạo mới:
            if (_sqlConnection == null)
            {
                _sqlConnection = new SqlConnection(_connectionString);
            }

            //Nếu đang đóng kết nối thì mở
            if (_sqlConnection.State == ConnectionState.Closed)
            {
                _sqlConnection.Open();
            }

            //Nếu không có command đến DB thì tạo command
            if (_sqlCommand == null)
            {
                _sqlCommand = _sqlConnection.CreateCommand();
            }

        }

        /// <summary>
        /// Đóng kết nối khi không sử dụng đối tượng DatabaseAccess 
        /// CreatedBy: NDCong(10/6/2019)
        /// </summary>
        public void Dispose()
        {
            _sqlConnection.Close();
            _sqlCommand = null;
        }
    }
}

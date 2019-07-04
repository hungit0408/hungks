using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using MISA.Mshopkeeper02.Models;

namespace MISA.Mshopkeeper02
{
    public class DataAccess<T>
    {
        SqlConnection _sqlConnection;
        SqlCommand _sqlCommand;

        public DataAccess()
        {
            string _connectionString = @"Data Source=database\sql2014;Initial Catalog=MISA.MSHOP.LSKY;Integrated Security=True";
            //khởi tạo đối tượng SqlConnection để kết nối vói db
            _sqlConnection = new SqlConnection(_connectionString);
            //khởi tạo đối tượng SqlCommand để thao tác với db
            _sqlCommand = _sqlConnection.CreateCommand();
            //khai báo CommandType kiểu thao tác vói Database
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            //mở kết nối
            _sqlConnection.Open();
        }

        public List<T> GetData(string ProcName, SqlParameter sqlParameter)
        {
            var entities = new List<T>();
            //khai báo câu lệnh truy vấn với DB
            _sqlCommand.CommandText = ProcName;
            if(sqlParameter != null)
            {
                _sqlCommand.Parameters.Add(sqlParameter);

            }
            //khởi tạo đối tượng SqlDataReader hứng dữ liệu trả về
            SqlDataReader sqlDataReader = _sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    //lấy ra tên propertyName dựa vào tên cột của field hiện tại
                    var propertyName = sqlDataReader.GetName(i);
                    //lấy ra giá trị của field hiện tại
                    var propertyValue = sqlDataReader.GetValue(i);
                    //gán value cho property tương ứng
                    var propertyInfo = entity.GetType().GetProperty(propertyName);//check field ở Outwardkyls có ko
                    if (propertyInfo != null && propertyValue != DBNull.Value)
                    {
                        propertyInfo.SetValue(entity, propertyValue);
                    }

                }
                entities.Add(entity);
            }
            _sqlConnection.Close();
            return entities;
        }

        public int PostData(T entity, string procName)
        {
            _sqlCommand.CommandText = procName;
            //
            SqlCommandBuilder.DeriveParameters(_sqlCommand);
            //
            var parameters = _sqlCommand.Parameters;
            //
            SqlTransaction sqlTransaction = _sqlCommand.Connection.BeginTransaction();
            //
            _sqlCommand.Transaction = sqlTransaction;
            var result = 0;
            try
            {
                foreach (SqlParameter parameter in parameters)
                {
                    var paramName = parameter.ToString().Replace("@", string.Empty);
                    var property = entity.GetType().GetProperty(paramName);
                    if (property != null)
                    {
                        var paramValue = property.GetValue(entity);
                        parameter.Value = paramValue != null ? paramValue : DBNull.Value;
                    }
                    else
                    {
                        parameter.Value = DBNull.Value;
                    }
                }
                result = _sqlCommand.ExecuteNonQuery();
                sqlTransaction.Commit();
            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                string msg = "Insert Error:";
                msg += ex.Message;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return result;
            
        }

        public int DeleteData(string ProcName, SqlParameter sqlParameter)
        {
            var result = 0;
            //khai báo câu lệnh truy vấn với DB
            _sqlCommand.CommandText = ProcName;

            //
            _sqlCommand.Parameters.Add(sqlParameter);
            //
            SqlTransaction sqlTransaction = _sqlCommand.Connection.BeginTransaction();
            //
            _sqlCommand.Transaction = sqlTransaction;
            try
            {
                result = _sqlCommand.ExecuteNonQuery();
                sqlTransaction.Commit();

            }
            catch(SystemException ex)
            {
                var str = "error: " + ex;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return result;
        }

        public string ReadyVoucher(string ProcName)
        {
            var vouchercode = "";
            _sqlCommand.CommandText = ProcName;
            try
            {
                //get vouchercode not used

                 _sqlCommand.Parameters.Add("@Result", SqlDbType.VarChar, 20);
                _sqlCommand.Parameters["@Result"].Direction = ParameterDirection.Output;              
                _sqlCommand.ExecuteNonQuery();
                vouchercode = (string)_sqlCommand.Parameters["@Result"].Value;
            }
            catch (SystemException ex)
            {
                var strr = "error: " + ex;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return vouchercode; 
        }

    }
}
//const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const API_URL = "http://localhost:3000";

export class HandleApi {
  // Login
  static async login({ email, password }) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return data;
    }
  }

  // Logout
  static async logout() {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error.message);
      return data;
    }
  }
  // Verificar token
  static async verifyToken() {
    try {
      console.log(`${API_URL}/login`);
      const response = await fetch(`${API_URL}/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        return { data: data, status: response.status };
      } else {
        return data;
      }
    } catch (error) {
      return error;
    }
  }

  // Registro
  static async register({ firstName, firtsLastname, phone, email, password }) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          firtsLastname,
          phone,
          email,
          password,
        }),
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async postDeposit({ id, sourceCard, destinationCard, amount }) {
    try {
      const response = await fetch(`${API_URL}/incomes/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceCard, destinationCard, amount }),
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async postWithdrawal({ id, sourceCard, amount }) {
    try {
      const response = await fetch(`${API_URL}/withdrawal/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceCard, amount }),
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async postTransfer({
    id,
    recipientEmail,
    sourceCard,
    amount,
    message,
  }) {
    try {
      const response = await fetch(`${API_URL}/transfers/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipientEmail, sourceCard, amount, message }),
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async postService({ id, sourceCard, serviceName, reference, amount }) {
    try {
      const response = await fetch(`${API_URL}/payments/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceCard, serviceName, reference, amount }),
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async postCard({ id, cardNumber, expirationDate, cvv, balance }) {
    try {
      const response = await fetch(`${API_URL}/card/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardNumber, expirationDate, cvv, balance }),
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async getTotalTransfers({ id }) {
    try {
      const response = await fetch(`${API_URL}/transfers/total/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async getTotalIncomes({ id }) {
    try {
      const response = await fetch(`${API_URL}/income/total/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async getTotalWithdrawal({ id }) {
    try {
      const response = await fetch(`${API_URL}/withdrawal/total/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async getTransactions({ id }) {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return error;
    }
  }

  static async getTransactionsFilter({ id, dateTransaction, type }) {
    try {
      const url = new URL(`${API_URL}/transactions/filter/${id}`);
      const params = new URLSearchParams();

      if (dateTransaction) {
        params.append("dateTransaction", dateTransaction);
      }

      if (type && type !== "Select a type") {
        params.append("type", type);
      }

      url.search = params.toString();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async getUser({ id }) {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async getCards({ id }) {
    try {
      const response = await fetch(`${API_URL}/cards/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async patchUserInfo({ id, firstName, firstLastname, phone, email }) {
    try {
      const response = await fetch(`${API_URL}/user/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ firstName, firstLastname, phone, email }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async patchUserPassword({ id, password }) {
    try {
      const response = await fetch(`${API_URL}/user/update/password/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async patchDeactivateUser({ id }) {
    try {
      const response = await fetch(`${API_URL}/user/deactivate/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  // Filtrar transacciones por fecha
  /* static async filterByDate({ dateTransaction }) {
        try {
            const response = await fetch(`${API_URL}/filterDate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({ dateTransaction }),
            })

            const data = await response.json()
            if (response.ok) {
                console.log('Filtrado por fecha:', data)
                return data
            } else {
                throw new Error(data.message || 'Error al filtrar por fecha')
            }
        } catch (error) {
            console.error('Error al filtrar por fecha:', error)
            throw error
        }
    } */
}

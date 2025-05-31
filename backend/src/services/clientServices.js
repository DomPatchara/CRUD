import db from "../../db.js";

// Services ---> All complex "main logic" for backend : This case is [ Create/Read/Update/Delete ]

export const getAllClient = async () => {
  const { rows } = await db.query("SELECT * FROM clients_tb");
  return rows;
};


// CREATE --- logic create ได้แค่ทีละ 1 clients 
export const createClient = async (clientData) => {
  const { name, email, job, rate, isactive } = clientData;

  const query = `
    INSERT INTO clients_tb (name, email, job, rate, isactive) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING * `

  const values = [name, email, job, rate, isactive]  

  const { rows } = await db.query(query, values);
  return rows[0];
  
};


// UPDATE
export const updateClient = async (clientData, id) => {
  const { name, email, job, rate, isactive } = clientData;

  const query = `
    UPDATE clients_tb 
    SET name = $1,
        email = $2, 
        job = $3,
        rate = $4, 
        isactive = $5
    WHERE id = $6  
    RETURNING * `

  const values = [name, email, job, rate, isactive, id]  

  const { rows } = await db.query(query, values);
  return rows[0];
};

// DELETE
export const deleteClient = async (id) => {

  const query = `
    DELETE FROM clients_tb WHERE id = $1`

  const { rowCount } = await db.query(query, [id]);
  return rowCount > 0;
};

// Search Term
export const searchClients = async (searchTerm) => {
  const query = `
    SELECT * FROM clients_tb
    WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1
    ORDER BY name ASC
  `;

  const values = [`%${searchTerm}%`]; // case-insensitive partial match
  const { rows } = await db.query(query, values);
  return rows;
};
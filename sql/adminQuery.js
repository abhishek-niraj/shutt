const addAdmin = `Insert Into admin Set ?`;
const getAdmin = `Select id, email, role, password From admin Where email = ?`;
module.exports = {
  addAdmin,
  getAdmin,
};

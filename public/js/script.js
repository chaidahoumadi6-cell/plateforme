

// Ajouter client
function ajouterClient() {
    fetch(`/api/clients/${id}`,{method: "DELETE"})
    .then(res => res.json())
    .then(data => window.location.href = data.routeClients)
    .catch(err => console.log(err));
}

// Ouvre le modal en mode "modification" les champs avec les données du membre
function modifier(id, nom, prenom, email, telephone) {

  // Met à jour le titre du modal
  document.querySelector(".modal-header").textContent = "Modifier un membre";

  //  les champs du formulaire avec les valeurs existantes
  document.getElementById("nom").value = nom || "";
  document.getElementById("prenom").value = prenom || "";
  document.getElementById("email").value = email || "";
  document.getElementById("telephone").value = telephone || "";
  
  // Affiche le modal
  modal.style.display = "block";

  const form = document.getElementById("membreForm");


    
    // Gère la soumission du formulaire de modification
    form.onsubmit = (e) => {
        // Empêche le rechargement de la page
        e.preventDefault();

        // Récupère les valeurs saisies dans le formulaire
        const data = { ... };

        fetch(`/api/clients/${id}`, {  
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        
    };  






    // Envoie les données modifiées à l'API via une requête PUT
    fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        // Ferme le modal
        modal.style.display = "none";
        // Affiche un message de succès
        showToast("Modification réussie !");
        // Recharge la page après 1,2s
        setTimeout(() => location.reload(), 1200);
      } else {
         // Affiche une erreur serveur
        showToast("Erreur serveur", "error");
      }
    })
    // Affiche une erreur réseau
    .catch(() => showToast("Erreur réseau", "error"));
};






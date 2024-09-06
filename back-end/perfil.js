document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const recommendationsDiv = document.getElementById('recommendations');

    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
        // e atualizar o perfil do usuário.

        // Exemplo de dados fictícios para recomendações
        const recommendations = [
            'Produto A - Baseado em suas preferências de Opt1',
            'Produto B - Baseado em suas atividades recentes',
            'Produto C - Recomendado por nossos especialistas'
        ];

        // Limpar as recomendações atuais
        recommendationsDiv.innerHTML = '';

        // Adicionar novas recomendações
        recommendations.forEach(recommendation => {
            const p = document.createElement('p');
            p.textContent = recommendation;
            recommendationsDiv.appendChild(p);
        });

        alert('Perfil atualizado com sucesso!');
    });
});

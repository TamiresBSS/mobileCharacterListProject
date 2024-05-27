import { allCharacters } from './allcharacters.js';

// Função para filtrar personagens
function filtro(selectedFilters) {
    const filteredCharacters = Object.values(allCharacters).filter((character) => {
        // console.log('Verificando personagem:', character);
        const char = Object.values(character).some(value => selectedFilters.includes(value));
        // console.log(`Valores do personagem: ${Object.values(character)}, Correspondência encontrada: ${char}`);
        return char;
    });

    console.log('Filtered Characters:', filteredCharacters);
    return filteredCharacters.map((character) => ({
        rarity: character.rarity,
        photo: character.photo,
        name: character.name,
        type: character.type,
        position: character.position,
        Xatk: character.Xatk,
        Xskill: character.Xskill,
        team: character.team,
        desc: character.desc,
        descX: character.descX
    }));
}
// Filtros Selecionados
const filterItems = document.querySelectorAll('.filtroRank li');
filterItems.forEach(item => {
    item.addEventListener('click', function () {
        this.classList.toggle('li-selected');
        const selectedFilters = Array.from(document.querySelectorAll('.li-selected'))
            .map((item) => item.getAttribute('data-rank-filter'));

        const filteredCharacters = filtro(selectedFilters);
        console.log("filtros ativos: ", selectedFilters);
        console.log("chars filtrados:", filteredCharacters);
        generateProfileCards(filteredCharacters);
    });
});
// Limpar Filtros
function clearAll() {
    const selectedItems = document.querySelectorAll('.li-selected');
    selectedItems.forEach(item => {
        item.classList.remove('li-selected');
    });
    // generateProfileCards("");
    generateProfileCards(allCharacters);
}
// Adiciona um evento de clique ao elemento com o ID 'clearAll' para chamar a função clearAllFilters()
document.getElementById('clearAll').addEventListener('click', clearAll);

// Teammates
function createTeamLinks(character) {

    const team = character.team.map(memberId => {
        const member = allCharacters[memberId];
        if (member) {
            return `<a href="">${member.name} </a>`; // Criar link para o perfil do membro da equipe
        } else {
            return ""; // Caso o membro da equipe não exista
        }
    });
    console.log(team);
    return team;
}

// Gerar os cartões de personagens
function generateProfileCards(filteredCharacters) {

    const cardSection = document.querySelector('#cardSection');

    if (filteredCharacters.length === 0) {
        cardSection.innerHTML = '';
    }
    else {
        cardSection.innerHTML = '';

        for (const characterId in filteredCharacters) {
            const character = filteredCharacters[characterId];
            console.log("Nome do personagem: ", character.name);

            const profileWrapper = document.createElement('div');
            profileWrapper.classList.add('myCards', 'wrap', 'grid');

            const flexWrapper = document.createElement('div');
            flexWrapper.classList.add('cardTop', 'flex', 'justify-corners', 'align-center', 'mt-03');

            const innerFlexWrapper = document.createElement('div');
            innerFlexWrapper.classList.add('flex', 'gap-2');

            const typeParagraph = document.createElement('p');
            typeParagraph.classList.add('text-center', 'boldText', 'wrap', 'p-05', 'c-type');
            typeParagraph.textContent = character.rarity;

            const nameParagraph = document.createElement('p');
            nameParagraph.classList.add('boldText', 'center', 'charName');
            nameParagraph.textContent = character.name;

            const roleParagraph = document.createElement('p');
            roleParagraph.classList.add('boldText', 'wrap', 'p-05');
            roleParagraph.textContent = character.type;

            const teamsParagraph = document.createElement('p');
            teamsParagraph.classList.add('cardBD', 'cardDesc', 'p-05');
            // teamsParagraph.textContent = 'ft: ' + character.team;
            teamsParagraph.textContent = 'ft: ' + createTeamLinks(character);

            innerFlexWrapper.appendChild(typeParagraph);
            innerFlexWrapper.appendChild(nameParagraph);
            flexWrapper.appendChild(innerFlexWrapper);
            flexWrapper.appendChild(roleParagraph);
            profileWrapper.appendChild(flexWrapper);
            profileWrapper.appendChild(teamsParagraph);

            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('cardBottom', 'flex');

            const gridWrapper = document.createElement('div');
            gridWrapper.classList.add('grid');

            const cardPhoto = document.createElement('img');
            cardPhoto.classList.add('cardPhoto', 'center');
            cardPhoto.style.backgroundImage = `url(${character.photo})`;
            // cardPhoto.style.backgroundSize = '15cqmax';

            const positionWrapper = document.createElement('p');
            positionWrapper.classList.add('text-center', 'boltText', 'center', 'p-05');
            positionWrapper.textContent = character.position;

            gridWrapper.appendChild(cardPhoto);
            gridWrapper.appendChild(positionWrapper);

            const damageWrapper = document.createElement('div');
            damageWrapper.classList.add('grid', 'mt-1', 'center');

            const dmg1Paragraph = document.createElement('p');
            dmg1Paragraph.textContent = character.Xatk;
            dmg1Paragraph.classList.add('dmg', 'text-center', 'align-center');

            const dmg2Paragraph = document.createElement('p');
            dmg2Paragraph.textContent = character.Xskill;
            dmg2Paragraph.classList.add('dmg', 'text-center', 'align-center');

            damageWrapper.appendChild(dmg1Paragraph);
            damageWrapper.appendChild(dmg2Paragraph);
            gridWrapper.appendChild(damageWrapper);
            cardWrapper.appendChild(gridWrapper);
            profileWrapper.appendChild(cardWrapper);

            const cardInfoWrapper = document.createElement('div');
            // cardInfoWrapper.classList.add('cardInfo');

            const descParagraph = document.createElement('div');
            descParagraph.classList.add('cardBD', 'cardDesc', 'desc', 'p-05');
            descParagraph.textContent = character.desc;

            const additionalInfoParagraph = document.createElement('p');
            additionalInfoParagraph.classList.add('cardBD', 'cardDesc', 'p-05');

            additionalInfoParagraph.textContent = character.descX;
            cardInfoWrapper.appendChild(descParagraph);
            cardInfoWrapper.appendChild(additionalInfoParagraph);
            cardWrapper.appendChild(cardInfoWrapper);
            cardSection.appendChild(profileWrapper);
        }
    }
}

// Cria os cards
generateProfileCards(allCharacters);
import { allCharacters } from './allcharacters.js';
// => eventListener
const filterItems = document.querySelectorAll('.filtroRank li');
let counter;
// Função para filtrar personagens
function filtro(selectedFilters) {
    const char = {};
    let totalChar = 0;
    const filteredCharacters = Object.values(allCharacters).filter((character) => {
        const rarityFilter = selectedFilters.find(filter => filter === character.rarity);
        const roleFilter = selectedFilters.find(filter => filter === character.role);
        const positionFilter = selectedFilters.find(filter => filter === character.position);

        const passesRarityFilter = rarityFilter ? true : false;
        const passesRoleFilter = roleFilter ? true : false;
        const passesPositionFilter = positionFilter ? true : false;

        counter = selectedFilters.length;
        const checker = [passesRarityFilter, passesRoleFilter, passesPositionFilter].filter(Boolean).length;

        // Um único filtro ativado
        if (counter === 1) {
            if (checker === 1 && passesRarityFilter) {
                totalChar++;
                char[totalChar] = character;
                return char;
            }
            if (checker === 1 && (passesPositionFilter || passesRoleFilter)) {
                if (passesPositionFilter) {
                    totalChar++;
                    char[totalChar] = character;
                    return char;
                } else {
                    totalChar++;
                    char[totalChar] = character;
                    return char;
                }
            }
        }
        // Dois filtros ativados
        if (counter === 2) {
            if (checker === 2 && passesRarityFilter) {
                if (passesRoleFilter) {
                    totalChar++;
                    char[totalChar] = character;
                    return char;
                } else {
                    totalChar++;
                    char[totalChar] = character;
                    return char;
                }
            }
            if (checker === 2 && !passesRarityFilter) {
                totalChar++;
                char[totalChar] = character;
                return char;
            }
        }
        // Todos os três filtros ativados
        if (checker === 3 && counter === 3) {
            totalChar++;
            char[totalChar] = character;
            return char;
        }
    });

    // console.log("Chars filtrados: ", totalChar);
    return filteredCharacters.map((character) => ({
        rarity: character.rarity,
        photo: character.photo,
        name: character.name,
        role: character.role,
        position: character.position,
        Xatk: character.Xatk,
        Xskill: character.Xskill,
        team: character.team,
        desc: character.desc,
        descX: character.descX
    }));
}
// Real-time updating filters
filterItems.forEach(item => {
    item.addEventListener('click', function () {
        const parent = this.parentNode;
        // Seleção desmarca quando clicada novamente
        if (this.classList.contains('li-selected')) {
            this.classList.remove('li-selected');
        } else {
            // Garante que apenas um filtro esteja ativo por Categoria
            parent.querySelectorAll('.li-item').forEach(item => item.classList.remove('li-selected'));
            this.classList.add('li-selected');
        }
        // Cria o array com os filtros selecionados
        const selectedFilters = Array.from(document.querySelectorAll('.li-selected'))
            .map((item) => item.getAttribute('data-filter'));
        // Filtra os personagens
        const filteredCharacters = filtro(selectedFilters);
        // console.log("filtros ativos: ", selectedFilters);
        // Gera dos cartões de perfil
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
            return `<a href="">${member.name} </a>`;
            // Criar link para o perfil do membro da equipe
        } else {
            return "";
            // Caso o membro da equipe não exista
        }
    });
    // console.log(team);
    return team;
}

// Gerar os cartões de personagens
function generateProfileCards(filteredCharacters) {

    const cardSection = document.querySelector('#cardSection');
    if (filteredCharacters.length === 0 && counter === 0) {
        filteredCharacters = allCharacters;
    }

    cardSection.innerHTML = '';

    for (const characterId in filteredCharacters) {
        const character = filteredCharacters[characterId];

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
        roleParagraph.textContent = character.role;

        const teamsParagraph = document.createElement('p');
        teamsParagraph.classList.add('cardBD', 'cardDesc', 'p-05');
        teamsParagraph.textContent = 'ft:';
        // teamsParagraph.textContent = 'ft: ' + character.team;
        // teamsParagraph.textContent = 'ft: ' + createTeamLinks(character);

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
        const newDesc = character.desc.replace(/\n/g, '<br>');
        descParagraph.innerHTML = newDesc;

        const additionalInfoParagraph = document.createElement('p');
        additionalInfoParagraph.classList.add('cardBD', 'cardDesc', 'p-05');
        const newAdInfo = character.descX.replace(/\n/g, '<br>');
        additionalInfoParagraph.innerHTML = newAdInfo;

        cardInfoWrapper.appendChild(descParagraph);
        cardInfoWrapper.appendChild(additionalInfoParagraph);
        cardWrapper.appendChild(cardInfoWrapper);
        cardSection.appendChild(profileWrapper);
    }

}

// Cria os cards
generateProfileCards(allCharacters);
# CLAUDE.md - Project Documentatie

## Overzicht
Dit project is een website met medische calculators, oorspronkelijk geschreven in R, die worden omgezet naar HTML/JavaScript. Elke calculator heeft een aparte HTML-pagina die in een iframe wordt geladen. Gedeelde functionaliteit wordt opgeslagen in `shared.js` en alle styling in `styles.css`. Er wordt geen inline styling gebruikt.

## Projectstructuur
- **HTML-bestanden**: Afzonderlijke calculatorpagina's (bijv. `acute.html`, `cardio.html`, `dialyse.html`, etc.)
- **shared.js**: Bevat gedeelde functionaliteit voor alle calculators
- **styles.css**: Bevat alle styling voor het project
- **calculator-template.html**: Template voor het maken van nieuwe calculators

## Template Gebruik
Gebruik `calculator-template.html` als basis voor nieuwe calculators. Dit template bevat:
- Basis HTML-structuur
- Inclusie van `shared.js` en `styles.css`
- Voorbeeldstructuur voor inputvelden en output
- Placeholders voor calculator-specifieke logica

## Functionaliteiten

### Reset Knop
Elke calculator heeft een resetknop die:
- Alle inputvelden leegmaakt
- Outputvelden reset
- De calculator terugzet naar de initiële staat
- Geïmplementeerd in `shared.js` als `resetCalculator()`

### Kopieer Knop
Elke calculator heeft een kopieerknop die:
- Het resultaat van de calculator kopieert naar het klembord
- Een bevestigingsbericht toont
- Geïmplementeerd in `shared.js` als `copyResult()`

### Resizer Code
De resizer code zorgt ervoor dat de iframe automatisch meeschalen met de inhoud:
- Luistert naar `resize` events
- Past de hoogte van de iframe aan op basis van de inhoud
- Geïmplementeerd in `shared.js` als `resizeIframe()`

## Conventies

### Code
- Gebruik `shared.js` voor gedeelde functionaliteit
- Voeg calculator-specifieke logica toe in het betreffende HTML-bestand
- Gebruik `calculator-template.html` als basis voor nieuwe calculators
- Houd de code DRY (Don't Repeat Yourself)

### Styling
- Alle styling in `styles.css`
- Geen inline styling
- Gebruik consistente klasse- en id-namen
- Volg de bestaande stylingconventies

## Hoe een Nieuwe Calculator Toevoegen
1. Kopieer `calculator-template.html` naar een nieuw bestand (bijv. `nieuwe-calculator.html`)
2. Voeg de calculator-specifieke logica toe in het nieuwe bestand
3. Test de calculator grondig
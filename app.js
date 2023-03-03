//require('dontenv').config();
const { 
    createBot, 
    createProvider, 
    createFlow, 
    addKeyword,
    EVENTS, 
    CoreClass } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const ChatGPTClass = require('./chatgpt.class')

const createBotGPT= async({provider, database}) =>  {

    return new ChatGPTClass(database, provider);
}


//const chatGPT = new ChatGPTClass(new MockAdapter(), createProvider(BaileysProvider))



const flowSecundario = addKeyword(['0', 'siguiente'])
.addAnswer('Muchas gracias por utilizar el chatBot del programa de Ingenieria de sistemas de la Universidad Mariana')
.addAnswer('Si desea volver al incio escriba *menu* para regresar al bot 🤖')
.addAnswer('De lo contrario puedes salir del chat 😊👋');



const flowPregunta = addKeyword(['1', 'uno', 'número 1', 'número uno', 'numero 1', 'numero uno', 'número1', 'numero1']).addAnswer(
    [
    
      '📄 A continuación podrás escribir tu pregunta acerca de tu proceso investigativo',
      '','',
      '👉 *0* Para finalizar esta opcion 😉 '       
    ],
    null,
    null,
    [flowSecundario])


const flowFechas = addKeyword(['2', 'dos', 'número dos', 'número 2', 'numero dos', 'numero 2', 'número2', 'numero2']).addAnswer(
    [
        '🙌 Selecciona una de las siguientes opciones',
        '👉 *1* Para fechas de sustentación de tesis 🤔📜',
        '👉 *2* Para fechas de grados 🎓🥳',
        '👉 *3* Para fechas programadas de sustentacion de tesis 💪📑',
        '','',
        '👉 *0* Para finalizar esta opcion 😉'
    ],
    null,
    null,
    [flowSecundario]
)

    const flowPeticion = addKeyword(['1', 'petición'])
    .addAnswer('🙌 Tu solicitud de petición será procesada')    
    .addAnswer('¿Cual es tu peticion?',{ capture:true }, async (ctx, {flowDynamic}) => { 
    const peticion = ctx.body 
    console.log(peticion)
    return flowDynamic(`Tu peticion fue recibida con exito
    \n👉 *Menu* Para finalizar regresar al menú principal 😉
    \n👉 *0* Para finalizar esta opcion 😉`)


},[flowSecundario])

    const flowQueja = addKeyword(['2', 'queja'])
    .addAnswer('🙌 Tu solicitud de queja será procesada')    
    .addAnswer('¿Cual es tu queja?',{ capture:true }, async (ctx, {flowDynamic}) => { 
    const queja = ctx.body 
    console.log(queja)
    return flowDynamic(`Tu queja fue recibida con exito\n👉 *0* Para finalizar esta opcion 😉`)


},[flowSecundario])

    const flowRecurso = addKeyword(['3', 'recurso'])
    .addAnswer('🙌 Tu solicitud de recurso será procesada')    
    .addAnswer('¿Cual es tu solicitud de recurso?',{ capture:true }, async (ctx, {flowDynamic}) => { 
    const recurso = ctx.body 
    console.log(recurso)
    return flowDynamic(`Tu solicitud de recurso fue recibida con exito\n👉 *0* Para finalizar esta opcion 😉`)


},[flowSecundario])

    const flowSolicitud = addKeyword(['4', 'solicitud'])
    .addAnswer('🙌 Tu solicitud será procesada')    
    .addAnswer('¿Cual es tu solicitud?',{ capture:true }, async (ctx, {flowDynamic}) => { 
    const solicitud = ctx.body 
    console.log(solicitud)
    return flowDynamic(`Tu solicitud fue recibida con exito\n👉 *0* Para finalizar esta opcion 😉`)


},[flowSecundario])

    const flowFelicitacion = addKeyword(['5', 'felicitacion'])
    .addAnswer('🙌 Deja un mensaje de felicitacion')    
    .addAnswer('¿Cual es tu mensaje?',{ capture:true }, async (ctx, {flowDynamic}) => { 
    const felicitacion = ctx.body 
    console.log(felicitacion)
    return flowDynamic(`Tu felicitacion fue recibida con exito\n👉 *0* Para finalizar esta opcion 😉`)


},[flowSecundario])

    const flowObservaciones = addKeyword(['6', 'observacion'])
    .addAnswer('🙌 Tu observacion será procesada')    
    .addAnswer('¿Cual es tu observacion?',{ capture:true }, async (ctx, {flowDynamic}) => { 
    const observacion = ctx.body 
    console.log(observacion)
    return flowDynamic(`Tu observacion fue recibida con exito\n👉 *0* Para finalizar esta opcion 😉`)


},[flowSecundario])

const flowPqrs = addKeyword(['3', 'tres', 'número tres', 'número 3', 'numero tres', 'numero 3', 'número3', 'numero3']).addAnswer(
    [
        '🚀 Selecciona una opción',
        '👉 *1* Peticion 🎓🥳',
        '👉 *2* Queja 🎓🥳',
        '👉 *3* Recurso 🎓🥳',
        '👉 *4* Solicitud 🎓🥳',
        '👉 *5* Felicitacion🎓🥳',
        '👉 *6* Otras observaciones🎓🥳',
        '','',
        '👉 *0* Para finalizar esta opcion 😉'
    ],
    null,
    null,
    [flowSecundario,flowPeticion,flowQueja,flowRecurso,flowSolicitud,flowFelicitacion,flowObservaciones]
)



const flowFinal = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowMenu = addKeyword(['menu', 'menú'])
    .addAnswer('🙌 Menú principal')
    .addAnswer(
        [
            'Selecciona la opción de tu interés, respondiendo con un número de la siguiente lista',
            '',
            '👉 *1* Para preguntas sobre el proceso investigativo 🤔📜',
            '',
            '👉 *2* Para consultar las fechas disponibles de sustentación de tesis 💪📜 y fechas de grados 🎓🥳',
            '',
            '👉 *3* Para PQRS del Chat Bot 🚦🛑',
        ],
        null,
        null,
        [ flowPregunta, flowPqrs, flowFechas, flowFinal]
    );



const flowPrincipal = addKeyword([EVENTS.WELCOME])
    //.addAnswer('Digite su correo electronico institucional',{capture:true})
    .addAnswer('🙌 Hola, bienvenido al Chat Bot del proceso investigativo de *Ingeniería de Sistemas* de la *Universidad Mariana*')
    .addAnswer('¿Cual es tu correo institucional?',{capture:true},(ctx, {fallBack})=>
    {        
        if(!ctx.body.includes('@umariana.edu.co'))
        {
            return fallBack()
        }
        //console.log('Mensaje entrante', ctx.body)
    })
    .addAnswer(
        [
            'Selecciona la opción de tu interés, respondiendo con un número de la siguiente lista',
            '',
            '👉 *1* Para preguntas sobre el proceso investigativo 🤔📜',
            '',
            '👉 *2* Para consultar las fechas disponibles de sustentación de tesis 💪📜 y fechas de grados 🎓🥳',
            '',
            '👉 *3* Para PQRS del Chat Bot 🚦🛑',
        ],
        null,
        null,
        [flowPregunta, flowPqrs, flowFechas, flowFinal, flowMenu]
    )

    


    

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowMenu, flowSecundario])
    const adapterProvider = createProvider(BaileysProvider)


    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    /**createBotGPT({
        provider: adapterProvider,
        database: adapterDB,
    })**/

    QRPortalWeb()
}

main()
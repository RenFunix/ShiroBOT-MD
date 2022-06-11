let handler = async (m, { conn, text }) => {
	if(isNaN(text)) {
  	var number = text.split`@`[1]
  } else if(!isNaN(text)) {
  	var number = text
  }

  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  if(!text && !m.quoted) return conn.reply(m.chat, `Berikan nomor, tag atau balas pesan target.`, m)
  // let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*Nomor target tidak terdaftar di WhatsApp*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `Nomor yang anda masukan tidak salah!`, m)
  if(number.length > 15) return conn.reply(m.chat, `Format salah!`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
    let users = m.isGroup ? participants.find(u => u.jid == user) : {}
    if(!users) return conn.reply(m.chat, `[❗] Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.`, m)
    if(user === m.sender) return conn.reply(m.chat, `[❗] Tidak bisa berpacaran dengan diri sendiri!`, m)
    if(user === conn.user.jid) return conn.reply(m.chat, `[❗] Tidak bisa berpacaran dengan saya. . .`, m)
    
    if(global.db.data.users[user].pasangan != m.sender){
      conn.reply(m.chat,`Maaf @${user.split('@')[0]} tidak sedang menembak anda 👥`,m,{contextInfo: {
        mentionedJid: [user]
      }})
    }else{
      global.db.data.users[m.sender].pasangan = user
      global.db.data.users[m.sender, user].money -= 1000
      conn.reply(m.chat,`Selamat anda resmi berpacaran dengan @${user.split('@')[0]} 💗\n\n🎉 Semoga langgeng dan bahagia selalu @${user.split('@')[0]} 💓 @${m.sender.split('@')[0]} 🥳🥳🥳\n\n💹 *Pajak Jadian:* -1000 `,m,{contextInfo: {
        mentionedJid: [m.sender,user]
      }})
    }
	}	
}
handler.help = ['sayaterima @tag']
handler.tags = ['fun']
handler.command = /^(sayaterima)$/i
handler.group = true
handler.limit = false
handler.fail = null
module.exports = handler
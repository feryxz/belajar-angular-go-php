package wa

import (
	"fmt"

	"go.mau.fi/whatsmeow"
	"go.starlark.net/lib/proto"
)

// "DigitalAssistance/global"
// "context"
// "fmt"
// "io/ioutil"

func Bye(client *whatsmeow.Client, sender string) {

	// content, err := ioutil.ReadFile("./chart-pie.png")
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// resp, err := global.Cli.Upload(context.Background(), content, whatsmeow.MediaImage)
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// // hydratedUrlButton := waProto.HydratedTemplateButton_UrlButton{
	// // 	UrlButton: &waProto.HydratedURLButton{
	// // 		DisplayText: proto.String("زر الرابط"),
	// // 		Url:         proto.String("https://www.bankaljazira.com/FFL"),
	// // 	},
	// // }

	// // hydratedCallButton := waProto.HydratedTemplateButton_CallButton{
	// // 	CallButton: &waProto.HydratedCallButton{
	// // 		DisplayText: proto.String("Call me"),
	// // 		PhoneNumber: proto.String("+1 23456789"),
	// // 	},
	// // }

	// hydratedQuickReplyButton := waProto.HydratedTemplateButton_QuickReplyButton{
	// 	QuickReplyButton: &waProto.HydratedQuickReplyButton{
	// 		DisplayText: proto.String("Quick Reply 1"),
	// 		Id:          proto.String("QuickReply1"),
	// 	},
	// }
	/*
		imageMessage := waProto.ImageMessage{
			Url:      proto.String("https://mmg.whatsapp.net/d/f/AlAF9hFHR7336ScKIqHneB2NpVYsiKWsT05RKTdEUSbl.enc "),
			Mimetype: proto.String("image/jpeg"),
			Caption:  proto.String("الآن بطاقة العملات مجاناً مدى الحياة تقدّم بالحصول عليها من خلال القنوات الالكترونية لبنك الجزيرة أو عبر الفرع"),
		}
	*/
	// imageMessage := waProto.ImageMessage{
	// 	//	Caption:  proto.String("شكرا و عيدكم مبارك"),
	// 	Mimetype: proto.String("image/png"), // replace this with the actual mime type
	// 	// you can also optionally add other fields like ContextInfo and JpegThumbnail here

	// 	Url:           &resp.URL,
	// 	DirectPath:    &resp.DirectPath,
	// 	MediaKey:      resp.MediaKey,
	// 	FileEncSha256: resp.FileEncSHA256,
	// 	FileSha256:    resp.FileSHA256,
	// 	FileLength:    &resp.FileLength,
	// }

	// hydratedImage := waProto.HydratedFourRowTemplate_ImageMessage{
	// 	ImageMessage: &imageMessage,
	// }

	// hydratedFourRowTemplate := waProto.HydratedFourRowTemplate{
	// 	//	HydratedContentText: proto.String("الآن العرض الجديد"),
	// 	//	HydratedFooterText:  proto.String("تطبّق الشروط والأحكام"),
	// 	HydratedButtons: []*waProto.HydratedTemplateButton{
	// 		{
	// 			Index:          proto.Uint32(uint32(1)),
	// 			HydratedButton: &hydratedUrlButton,
	// 		},
	// 		{
	// 			Index:          proto.Uint32(uint32(2)),
	// 			HydratedButton: &hydratedCallButton,
	// 		},
	// 		{
	// 			Index:          proto.Uint32(uint32(3)),
	// 			HydratedButton: &hydratedQuickReplyButton,
	// 		},
	// 	},
	// 	TemplateId: proto.String("id1"),
	// 	Title:      &hydratedImage,
	// }

	// templateMessage := waProto.TemplateMessage{
	// 	// ContextInfo:      &waProto.ContextInfo{},
	// 	HydratedTemplate: &hydratedFourRowTemplate,
	// 	Format:           nil,
	// }

	// msg := waProto.Message{
	// 	Conversation: proto.String("Hello"),
	// 	// TemplateMessage: &templateMessage,
	// }

	// jid, ok := global.ParseJID(sender)
	// if !ok {
	// 	return
	// }
	// send, err := global.Cli.SendMessage(jid, "", &msg) // jid = recipient

	// if err != nil {
	// 	global.Log.Errorf("Error sending message: %v", err)
	// } else {
	// 	global.Log.Infof("Message sent (server timestamp: %s)", send)
	// }

	recipient := "62822222" // Assuming "0822222" is the complete phone number including country code

	// Set the message content
	message := "Hello, this is a test message from your Go program!"

	// Create a new message instance
	msg := &proto.Message{
		Conversation: recipientJID,
		Body:         message,
	}

	// Send the message
	_, err := client.SendMessage(recipient, msg)
	if err != nil {
		panic(err) // Handle error appropriately in your application
	} else {
		fmt.Println("Message sent successfully!")
	}
}

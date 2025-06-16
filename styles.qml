import QtQuick 2.15

QtObject {
    property color primaryColor: "#4A90E2"
    property color secondaryColor: "#F7CAC9"
    property color backgroundColor: "#f0f0f0"

    property font defaultFont: font { pointSize: 16 }

    Rectangle {
        id: root
        width: 100
        height: 100

        // Button style
        Button {
            background: root.primaryColor
            color: "white"
            font: root.defaultFont

            border.color: root.primaryColor.darker()
        }

        // TextField and TextArea styles
        TextField {
            background: "white"
            color: "black"
            border.color: root.primaryColor
            padding: 5

            font: root.defaultFont
        }
    }
}
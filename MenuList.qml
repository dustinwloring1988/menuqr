import QtQuick 2.15
import QtQuick.Controls 2.15

Rectangle {
    id: menuListRect
    color: "transparent"

    property var model: []
    property var selectedItem: null

    ListView {
        id: listView
        anchors.fill: parent
        model: menuListRect.model

        delegate: Rectangle {
            width: listView.width
            height: 40
            color: ListView.isCurrentItem ? "lightblue" : "white"

            Text {
                text: name
                anchors.centerIn: parent
            }

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    selectedItem = model.get(index)
                    listView.currentIndex = index
                }
            }
        }
    }
}
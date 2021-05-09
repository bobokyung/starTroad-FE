<template>
  <div class="container">
    <div v-if="!isMine" id="toolbar">
      <b-button variant="primary"
        @click="
          $refs.chart.add({
            id: +new Date(),
            x: 10,
            y: 10,
            name: 'New',
            type: 'operation',
            approvers: [],
          })
        "
      >
        추가하기(Canvas 두번클릭)
      </b-button>
      <b-button variant="danger" @click="$refs.chart.remove()">삭제하기(Del)</b-button>
      <b-button @click="$refs.chart.editCurrent()">
        수정하기(Node 두번클릭)
      </b-button>
      <b-button variant="success" @click="$refs.chart.save()">저장하기</b-button>

    </div>
    <flowchart
      :nodes="nodes"
      :connections="connections"
      @editnode="handleEditNode"
      :width="'100%'"
      :height="800"
      :readonly="false"
      @dblclick="handleDblClick"
      @editconnection="handleEditConnection"
      @save="handleChartSave"
      ref="chart"
      :render="render"
    >
    </flowchart>
    <node-dialog
      :visible.sync="nodeDialogVisible"
      :node.sync="nodeForm.target"
    ></node-dialog>
    <connection-dialog
      :visible.sync="connectionDialogVisible"
      :connection.sync="connectionForm.target"
      :operation="connectionForm.operation"
    >
    </connection-dialog>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import ConnectionDialog from "@/components/ConnectionDialog";
import NodeDialog from "@/components/NodeDialog";
import Flowchart from "@/components/flowchart/Flowchart";
import * as d3 from "d3";
import { roundTo20 } from "@/util/math";

export default {
  components: {
    ConnectionDialog,
    NodeDialog,
    Flowchart,
  },
  props : {
    isMine : null
  },
  /*
  watch : {
    nodes : function(data){
      //실시간 node 변환마다 병합해서 저장해야함
      console.log("Asdf")
      this.shapeData()
      console.log(this.$store.state.roadmap.information)

    },
    connections : function(data){
      //실시간 connection 변환마다 병합해서 저장해야함
      console.log("zxcv")
      this.shapeData()
      console.log(this.$store.state.roadmap.information)

    }
  },
  */
  data: function () {
    return {
      nodes : [],
      connections : [],
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeDialogVisible: false,
      connectionDialogVisible: false,
    };
  },
  methods: {
    shapeData(nodes, connections){
      let information = [nodes, connections]
      this.$store.commit("saveInformation", JSON.stringify(information))
      
    },
    zipData(){
      let information = this.$store.state.information
      let rawdata = JSON.parse(information)
      
      this.nodes = rawdata[0]
      this.connections = rawdata[1]

    },
    handleDblClick(position) {
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y, 
        name: "New",
        type: "operation",
        approvers: "",
      });
    },
    handleChartSave(nodes, connections) {
      this.shapeData(nodes, connections);
      console.log(this.$store.state.information)
    },
    handleEditNode(node) {
      this.nodeForm.target = node;
      this.nodeDialogVisible = true;
    },
    handleEditConnection(connection) {
      this.connectionForm.target = connection;
      this.connectionDialogVisible = true;
    },
    render: function (g, node, isSelected) {

      node.width = node.width || 120;
      node.height = node.height || 60;
      let borderColor = isSelected ? "#666666" : "#bbbbbb";
      if (node.type !== "start" && node.type !== "end") {
        // title
        if (node.id !== 3) {
          g.append("rect")
            .attr("x", node.x)
            .attr("y", node.y)
            .attr("stroke", borderColor)
            .attr("class", "title")
            .style("height", "20px")
            .style("fill", "#f1f3f4")
            .style("stroke-width", "1px")
            .style("width", node.width + "px");
          g.append("text")
            .attr("x", node.x + 4)
            .attr("y", node.y + 15)
            .attr("class", "unselectable")
            .text(() => node.name)
            .each(function wrap() {
              let self = d3.select(this),
                textLength = self.node().getComputedTextLength(),
                text = self.text();
              while (textLength > node.width - 2 * 4 && text.length > 0) {
                text = text.slice(0, -1);
                self.text(text + "...");
                textLength = self.node().getComputedTextLength();
              }
            });
        }
      }
      // body
      if (node.id === 3) {
        let body = g.append("ellipse").attr("class", "body");
        body.attr("cx", node.x + node.width / 2);
        body.attr("cy", node.y + node.height / 2);
        body.attr("rx", node.width / 2);
        body.attr("ry", node.height / 2);
        body.style("fill", "white");
        body.style("stroke-width", "1px");
        body.classed(node.type, true);
        body.attr("stroke", borderColor);
      } else {
        let body = g.append("rect").attr("class", "body");
        body
          .style("width", node.width + "px")
          .style("fill", "white")
          .style("stroke-width", "1px");
        if (node.type !== "start" && node.type !== "end") {
          body.attr("x", node.x).attr("y", node.y + 20);
          body.style("height", roundTo20(node.height - 20) + "px");
        } else {
          body
            .attr("x", node.x)
            .attr("y", node.y)
            .classed(node.type, true)
            .attr("rx", 30);
          body.style("height", roundTo20(node.height) + "px");
        }
        body.attr("stroke", borderColor);
      }

      // body text
      let text=""
      if(node.type =="start"){
        text = node.name
      }else if(node.type =="end"){
        text = node.name
      }else if(node.type == "operation"){
        text = node.appovers
      }
 
      let bodyTextY;
      if (node.type !== "start" && node.type !== "end") {
        if (node.id === 3) {
          bodyTextY = node.y + 25;
        } else {
          bodyTextY = node.y + 25 + roundTo20(node.height - 20) / 2;
        }
      } else {
        bodyTextY = node.y + 5 + roundTo20(node.height) / 2;
      }
      g.append("text")
        .attr("x", node.x + node.width / 2)
        .attr("y", bodyTextY)
        .attr("class", "unselectable")
        .attr("text-anchor", "middle")
        .text(function () {
          return text;
        })
        .each(function wrap() {
          let self = d3.select(this),
            textLength = self.node().getComputedTextLength(),
            text = self.text();
          while (textLength > node.width - 2 * 4 && text.length > 0) {
            text = text.slice(0, -1);
            self.text(text + "...");
            textLength = self.node().getComputedTextLength();
          }
        });
    },
  },
  mounted(){
    

  },
  created(){
    //this.reshapeData()
  },
};
</script>
<style scoped>
#toolbar {
  margin-bottom: 10px;
}

.title {
  margin-top: 10px;
  margin-bottom: 0;
}

.subtitle {
  margin-bottom: 10px;
}

#toolbar > button {
  margin-right: 4px;
}

.container {
  max-width: 100% !important;
  
}
</style>

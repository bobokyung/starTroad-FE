<template>
  <div class="container">
    <div id="toolbar">
      <button
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
        Add(Double-click canvas)
      </button>
      <button @click="$refs.chart.remove()">Delete(Del)</button>
      <button @click="$refs.chart.editCurrent()">
        Edit(Double-click node)
      </button>
      <button @click="$refs.chart.save()">Save</button>
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
  data: function () {
    return {
      nodes : [{"id":1617528959889,"x":490,"y":40,"name":"Front-End","type":"start","approvers":[],"width":120,"height":60},{"id":1617528989863,"x":490,"y":180,"name":"Internet","type":"operation","approvers":[],"width":120,"height":60,"appovers":"Basic of Internets"},{"id":1617529015116,"x":700,"y":250,"name":"http","type":"operation","approvers":[],"width":120,"height":60,"appovers":"http basics"},{"id":1617529015482,"x":700,"y":100,"name":"Hosting","type":"operation","approvers":[],"width":120,"height":60,"appovers":"host on server"},{"id":1617529067671,"x":700,"y":170,"name":"What is Domain name","type":"start","approvers":[],"width":120,"height":60},{"id":1617529128772,"x":310,"y":110,"name":"browser","type":"operation","approvers":[],"width":120,"height":60,"appovers":"브라우저의 동작"},{"id":1617529131980,"x":310,"y":260,"name":"New","type":"operation","approvers":[],"width":120,"height":60},{"id":1617529132410,"x":310,"y":180,"name":"New","type":"operation","approvers":[],"width":120,"height":60},{"id":1617529173516,"x":490,"y":360,"name":"html 기초","type":"operation","approvers":[],"width":120,"height":60,"appovers":"html basics"},{"id":1617529320893,"x":300,"y":360,"name":"CSS structure","type":"start","approvers":[],"width":120,"height":60},{"id":1617529321015,"x":700,"y":360,"name":"Semantic html","type":"start","approvers":[],"width":120,"height":60},{"id":1617529349056,"x":490,"y":470,"name":"keep learning","type":"start","approvers":[],"width":120,"height":60}],
      connections : [{"source":{"id":1617528959889,"position":"bottom"},"destination":{"id":1617528989863,"position":"top"},"id":1617529010903,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"right"},"destination":{"id":1617529015482,"position":"left"},"id":1617529030538,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"right"},"destination":{"id":1617529015116,"position":"left"},"id":1617529053358,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"right"},"destination":{"id":1617529067671,"position":"left"},"id":1617529116480,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"left"},"destination":{"id":1617529128772,"position":"right"},"id":1617529139380,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"left"},"destination":{"id":1617529132410,"position":"right"},"id":1617529141325,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"left"},"destination":{"id":1617529131980,"position":"right"},"id":1617529146156,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"bottom"},"destination":{"id":1617529173516,"position":"top"},"id":1617529179733,"type":"pass","name":"Pass"},{"source":{"id":1617529173516,"position":"bottom"},"destination":{"id":1617529349056,"position":"top"},"id":1617529356941,"type":"pass","name":"Pass"},{"source":{"id":1617529173516,"position":"right"},"destination":{"id":1617529321015,"position":"left"},"id":1617529370163,"type":"pass","name":"Pass"},{"source":{"id":1617529173516,"position":"left"},"destination":{"id":1617529320893,"position":"right"},"id":1617529392839,"type":"pass","name":"Pass"}],
     
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeDialogVisible: false,
      connectionDialogVisible: false,
    };
  },
  async mounted() {},
  methods: {
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
    async handleChartSave(nodes, connections) {
      nodes = JSON.stringify(nodes)
      connections = JSON.stringify(connections)

      
      //node
      //[{"id":1617528959889,"x":490,"y":40,"name":"Front-End","type":"start","approvers":[],"width":120,"height":60},{"id":1617528989863,"x":490,"y":180,"name":"Internet","type":"operation","approvers":[],"width":120,"height":60,"appovers":"Basic of Internets"},{"id":1617529015116,"x":700,"y":250,"name":"http","type":"operation","approvers":[],"width":120,"height":60,"appovers":"http basics"},{"id":1617529015482,"x":700,"y":100,"name":"Hosting","type":"operation","approvers":[],"width":120,"height":60,"appovers":"host on server"},{"id":1617529067671,"x":700,"y":170,"name":"What is Domain name","type":"start","approvers":[],"width":120,"height":60},{"id":1617529128772,"x":310,"y":110,"name":"browser","type":"operation","approvers":[],"width":120,"height":60,"appovers":"브라우저의 동작"},{"id":1617529131980,"x":310,"y":260,"name":"New","type":"operation","approvers":[],"width":120,"height":60},{"id":1617529132410,"x":310,"y":180,"name":"New","type":"operation","approvers":[],"width":120,"height":60},{"id":1617529173516,"x":490,"y":360,"name":"html 기초","type":"operation","approvers":[],"width":120,"height":60,"appovers":"html basics"},{"id":1617529320893,"x":300,"y":360,"name":"CSS structure","type":"start","approvers":[],"width":120,"height":60},{"id":1617529321015,"x":700,"y":360,"name":"Semantic html","type":"start","approvers":[],"width":120,"height":60},{"id":1617529349056,"x":490,"y":470,"name":"keep learning","type":"start","approvers":[],"width":120,"height":60}]
      //connections
      //[{"source":{"id":1617528959889,"position":"bottom"},"destination":{"id":1617528989863,"position":"top"},"id":1617529010903,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"right"},"destination":{"id":1617529015482,"position":"left"},"id":1617529030538,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"right"},"destination":{"id":1617529015116,"position":"left"},"id":1617529053358,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"right"},"destination":{"id":1617529067671,"position":"left"},"id":1617529116480,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"left"},"destination":{"id":1617529128772,"position":"right"},"id":1617529139380,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"left"},"destination":{"id":1617529132410,"position":"right"},"id":1617529141325,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"left"},"destination":{"id":1617529131980,"position":"right"},"id":1617529146156,"type":"pass","name":"Pass"},{"source":{"id":1617528989863,"position":"bottom"},"destination":{"id":1617529173516,"position":"top"},"id":1617529179733,"type":"pass","name":"Pass"},{"source":{"id":1617529173516,"position":"bottom"},"destination":{"id":1617529349056,"position":"top"},"id":1617529356941,"type":"pass","name":"Pass"},{"source":{"id":1617529173516,"position":"right"},"destination":{"id":1617529321015,"position":"left"},"id":1617529370163,"type":"pass","name":"Pass"},{"source":{"id":1617529173516,"position":"left"},"destination":{"id":1617529320893,"position":"right"},"id":1617529392839,"type":"pass","name":"Pass"}]
      
      
      // axios.post(url, {nodes, connection}).then(resp => {
      //   this.nodes = resp.nodes;
      //   this.connections = resp.connections;
      //   // Flowchart will refresh after this.nodes and this.connections changed
      // });
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
      console.log(node)
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

<template>
  <el-container style="height: calc(100% - 40px)">
    <ELHeader></ELHeader>
    <el-footer style="background-color: #eef7f9;height: auto;min-height: 100%">
      <div>
        <el-button type="primary" class="mb-2" @click="addTalent()">添加新人才</el-button>
        <el-table :data="talents" style="width: 100%">
          <el-table-column prop="id" label="人才ID"></el-table-column>
          <el-table-column prop="name" label="人才Name"></el-table-column>
          <el-table-column prop="age" label="人才Age"></el-table-column>
          <el-table-column prop="sex" label="Sex"></el-table-column>
          <el-table-column prop="position" label="职位名称"></el-table-column>
          <el-table-column prop="salary" label="月薪"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.image" style="max-width: 100%; max-height: 100px;">
            </template>
          </el-table-column>
          <el-table-column prop="status" label="录用状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" @change="updateTalent(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTalent(scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTalent(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import ELHeader from "../components/ELHeader";

export default {
  name: "TalentPool",
  components: {
    ELHeader
  },
  data() {
    return {
      talents: [
        { id: 1, name: '张三', age: 25, sex: '男', position: '前端工程师', salary: 10000, image: 'https://via.placeholder.com/150x150', status: true },
        { id: 2, name: '李四', age: 30, sex: '女', position: '后端工程师', salary: 12000, image: 'https://via.placeholder.com/150x150', status: false },
        { id: 3, name: '王五', age: 28, sex: '男', position: 'UI设计师', salary: 8000, image: 'https://via.placeholder.com/150x150', status: true },
      ],
      dialogVisible: false,
      editForm: {},
    };
  },
  methods: {
    addTalent() {
      this.dialogVisible = true;
      this.editForm = {};
    },
    editTalent(row) {
      this.dialogVisible = true;
      this.editForm = Object.assign({}, row);
    },
    deleteTalent(row) {
      this.talents.splice(this.talents.indexOf(row), 1);
    },
    updateTalent(row) {
      console.log('update talent:', row);
    }
  }
}
</script>

<style scoped>

</style>

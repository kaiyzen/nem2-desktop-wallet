import {Message} from '@/config/index.ts'
import {formatDate} from '@/core/utils'
import {blog} from '@/core/api'
import {Component, Vue, Watch} from 'vue-property-decorator'
import CheckPasswordDialog from '@/components/check-password-dialog/CheckPasswordDialog.vue'
import {mapState} from 'vuex'
import {AppInfo, StoreAccount} from '@/core/model'
@Component({
  components: {
    CheckPasswordDialog,
  },
  computed: {
    ...mapState({
      activeAccount: 'account',
      app: 'app',
    }),
  },
})
export class InformationTs extends Vue {
  activeAccount: StoreAccount
  app: AppInfo
  startPage = 0
  articleList = []
  commentList = []
  totalComment = 0
  commentContent = ''
  loadAllData = false
  remainingWords = 300
  commentStartPage = 0
  showCheckPWDialog = false
  loadAllCommentData = false
  isLoadingConfirmedTx = true
  scroll: any
  currentArticle: any = {title: 'null', content: 'null'}
  transactionDetail = {}
  get address() {
    return this.activeAccount.wallet.address
  }

  get nickName() {
    return this.activeAccount.wallet.name
  }

  get abbreviation() {
    return this.$i18n.locale
  }

  close() {
    this.showCheckPWDialog = false
  }

  passwordValidated(flag) {
    if (flag) this.sendComment()
    this.close()
  }

  addArticleStartIndex() {
    this.startPage += 10
  }

  addCommentStartIndex() {
    this.commentStartPage += 10
  }

  formatDate(timestamp) {
    return formatDate(timestamp)
  }

  switchArticle(index) {
    let list = this.articleList
    this.currentArticle = list[index]
    list = list.map(item => {
      item.isSelect = false
      return item
    })
    list[index].isSelect = true
    this.articleList = list
    this.scrollTop()
  }

  divScroll(div) {
    this.scroll = div
  }

  scrollTop() {
    this.scroll.target.scrollTop = 0
  }

  checkForm() {
    const {commentContent} = this
    if (!commentContent || commentContent.trim() === '') {
      this.$Notice.error({
        title: `${this.$t(Message.INPUT_EMPTY_ERROR)}`,
      })
      return false
    }
    this.showCheckPWDialog = true
    const comment = this.commentContent
    const {address, nickName} = this
    this.transactionDetail = {
      comment,
      address,
      nickName,
    }
  }

  async sendComment() {
    const comment = this.commentContent
    const cid = this.currentArticle.cid
    const {address, nickName} = this
    const gtmCreate = new Date()
    try {
      await blog.commentSave({
        cid,
        comment,
        address,
        nickName,
        gtmCreate: gtmCreate.toDateString(),
      })
    } catch (e) {
      this.$Notice.error({title: `${this.$t(Message.OPERATION_FAILED_ERROR)}`})
    }
    this.onCurrentArticleChange()
  }

  switchLanguage() {
    const {abbreviation} = this
    let languageNumber = 1
    switch (abbreviation) {
      case 'zh-CN':
        languageNumber = 1
        break
      case 'en-US' :
        languageNumber = 2
        break
    }
    return languageNumber
  }

  automaticLoadingArticle() {
    // @ts-ignore
    const allHeight = this.$refs.listContainer.scrollHeight
    // @ts-ignore
    const scrollHeight = this.$refs.listContainer.offsetHeight + this.$refs.listContainer.scrollTop
    if (allHeight <= scrollHeight) 
    {this.getArticleByPage()}
    
  }

  automaticLoadingComment() {
    // @ts-ignore
    const allHeight = this.$refs.articleContainer.scrollHeight
    // @ts-ignore
    const scrollHeight = this.$refs.articleContainer.offsetHeight + this.$refs.articleContainer.scrollTop
    if (allHeight <= scrollHeight) 
    {this.getCommentByPage()}
    
  }


  async getArticleByPage() {
    if (this.loadAllData) return
    
    const languageNumber = this.switchLanguage()
    const {startPage} = this
    const rstStr = await blog.list({
      offset: startPage.toString(),
      limit: '10',
      language: languageNumber.toString(),
    })
    const rstQuery = JSON.parse(rstStr.rst)

    const articleList = this.articleList.concat(rstQuery.rows)
    articleList.map(item => {
      item.summary = item.title
      return item
    })
    this.articleList = articleList
    if (rstQuery.total <= this.articleList.length) 
    {this.loadAllData = true}
    
    this.isLoadingConfirmedTx = false
    this.addArticleStartIndex()
    this.articleList[0].isSelect = true
  }

  async getCommentByPage() {
    if (this.loadAllCommentData) return
    
    const cid = this.currentArticle.cid
    const offset = this.commentStartPage
    const rstStr = await blog.commentList({cid, limit: '10', offset: offset.toString()})
    const rstQuery = JSON.parse(rstStr.rst)
    this.commentList.push(...rstQuery.rows)
    this.totalComment = rstQuery.total
    if (rstQuery.total <= this.commentList.length) 
    {this.loadAllCommentData = true}
    
    this.addCommentStartIndex()
  }

  resetComment() {
    this.commentList = []
    this.commentStartPage = 0
    this.totalComment = 0
    this.loadAllCommentData = false
  }

  @Watch('currentArticle')
  onCurrentArticleChange() {
    this.resetComment()
    this.getCommentByPage()
  }

  @Watch('commentContent')
  onCommentContent(after, before) {
    this.remainingWords = 300 - this.commentContent.length
    if (this.commentContent.length > 300) 
    {this.commentContent = before}
    
  }

  async mounted() {
    try {
      await this.getArticleByPage()
      this.currentArticle = this.articleList[0]
    } catch (error) {
      console.error('informationTs -> mounted -> error', error)
    }
  }
}

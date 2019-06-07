import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

interface Item {
		text: string;
		complete: boolean;
}

@Component({
		name: 'TodoItem',
})
export default class TodoItem extends Vue {
		@Prop(Object) public item!: Item;
		@Prop(Number) public index!: number;
		@Prop(Number) public editingIndex!: number;

		public editingContent = '';

		@Watch('editingIndex')
		public editingChange(index) {
			if(index === this.index) {
				this.editingContent = this.item.text;
			} else {
				this.editingContent = '';
			}
		}

		public save() {
			this.$emit('on-save', {
				index: this.index,
				content: this.editingContent,
			});
		}

		public edit() {
			this.$emit('on-edit', this.index);
		}

		public cancel() {
			this.$emit('on-cancel');
		}

		protected render() {
			return (
				<li>
					{
					this.editingIndex === this.index ? (
						<div>
							<a-input v-model={this.editingContent} style={{ width: '200px' }} />
							<a-icon type='check' nativeOn-click={this.save}></a-icon>
							<a-icon type='close' nativeOn-click={this.cancel}></a-icon>
						</div>
					) : (
						<div>
							<span>{this.item.text}</span>
							<a-icon type='edit' nativeOn-click={this.edit}></a-icon>
						</div>
					)
				}
				</li>
			);
		}
}

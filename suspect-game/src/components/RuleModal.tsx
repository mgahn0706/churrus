import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { grey } from "@mui/material/colors";

interface RuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RuleModal({ isOpen, onClose }: RuleModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" sx={{ alignContent: "center" }}>
        규칙
      </DialogTitle>
      <DialogContent>
        <List sx={{ wordSpacing: 2.5, wordBreak: "keep-all" }}>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            피해자를 죽인 살인자는 용의자 중 단 1명입니다. 공범이나 자살,
            외부인에 의한 살인은 없습니다.
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            모든 플레이어는 돌아가면서 조사할 단서의 번호를 말합니다. 한번
            조사한 단서도 다시 볼 수 있지만, 단서의 수가 많기 때문에 기록해 놓는
            것을 추천합니다.
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            모든 단서를 조사했다면, 제한시간이 끝나기 전까지 자유롭게 토론 후
            최종적으로 가장 범인일 것 같은 인물에게 투표합니다.
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            모든 단서는 최대한 사건의 진상을 알아내는데 도움을 주도록
            설계되었으며, ‘알고보니 아무것도 아니었다’하는 단서는 없습니다.
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            제시된 증거만을 이용해서 추리가 가능하도록 최대한 노력했습니다.
            따라서, 제시되지 않은 동기나 살해 도구, 정황은 없다고 생각해주시면
            되겠습니다.
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
